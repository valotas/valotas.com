---
title: Java database connections management
date: 2010-06-30
---

A month ago, I had to do some work on a legacy application. As there is no definition of the "legacy application" expression I refer to an old one where no actual framework has been used for its creation. So there is no any ORM technology here. In that case you have to deal with plain old JDBC.

## The Model 2 Pattern

The most common way to handle database connectivity to a legacy application is the Model 2 pattern where you have a servlet doing all the connectivity with the database, creating the model, binding it to the request scope and forwarding the request to the view technology. As we are talking about a legacy application this is jsp.

### More than good practice

If you have a web application with traffic you will definitely know that you have to close the connections you use. That means that the connection will get returned to the connection pool you are using or just get closed. In case you do not close them your webapp will get to the state that will have all possible connections. That means that any request that needs a database interactivity won't be able to get server (until some how the connections will get closed).

In order do that and make sure that always the connection will get closed all the database logic should be enclosed within a try-catch-finally block and close the connection, possible statements and result sets object at the finally block.

Of course when you try to close a connection you should also be aware that the close operation itself can throw a SQLException. The solution is to enclose every operation that tries to close a resource to a try-catch block again. The code will end up to something like the below snipset

```java
Connection conn = null;
PreparedStatement st = null;
ResultSet = null;

try {
  //Assuming that we have a datasource object available
  conn = datasource.getConnection();
  st = conn.prepareStatement('fancy sql here');
  rs = st.executeQuery();
}
catch(SQLException) {
  // do whatever you want with the SQLException
}
finally {
  try {
    if (rs != null) rs.close();
  }
  catch (SQLException e) {
    //Do nothing
  }
  try {
    if (st != null) st.close();
  }
  catch (SQLException e) {
    //Do nothing
  }
  try {
    if (conn != null) conn.close();
  }
  catch (SQLException e) {
    //Do nothing
  }
}
```

### DRY

Having three same code of blocks in every class that has connection interactivity causes a lot of boilerplate code. So lets try to avoid that creating a Utility class:

```java
public class ConnUtil {
  public static final closeIgnoringExceptions(ResultSet rs) {
    try {
      if (rs != null) rs.close();
    }
    catch (SQLException e) {
      //do nothing
    }
  }

  public static final closeIgnoringExceptions(Statement st) {
    try {
      if (st != null) st.close();
    }
    catch (SQLException e) {
      //do nothing
    }
  }

public static final closeIgnoringExceptions(Connection conn) {
    try {
      if (conn != null) conn.close();
    }
    catch (SQLException e) {
      //do nothing
    }
  }
}
```

Using this utility class the final block of the previous snippet becomes:

```java
finally {
  closeIgnoringException(rs);
  closeIgnoringException(st);
  closeIgnoringException(st); // The problem!
}
```

So I fixed the bug, but I wasn't completely happy as I was thinking that autocomplete should be used without having to worry for cases like that. On solution is to change the names of the methods to something like `closeResultSetIgnoringExceptions(ResultSet rs)`, `closeStatementIgnoringExceptions(Statement st)` and `closeConnectionIgnoringExceptions(Connection conn)` and make uncle Bob happy. Looking for a much more elegant way, I come up with an additional utility method:

```java
public static final closeIgnoringExceptions(Connection conn, Statement st, ResultSet rs) {
  closeResultSetIgnoringExceptions(rs);
  closeStatementIgnoringExceptions(st);
  closeConnectionIgnoringExceptions(conn);
}
```

Making that finally block one liner: `closeIgnoringExceptions(conn, st, rs)` and letting the IDE do its job warning you if you don't use the right arguments and helping you with the autocomplete!

Of course you will not always be able to use this method as sometimes you may need to use some of the objects and close only the ResultSet or the Statement ones. I personally try to avoid it.

