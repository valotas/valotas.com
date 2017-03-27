---
title: Hibernate, mssql and limit
date: 2010-07-08
---

This is a strange combination. Not the hibernate with mssql (and any kind of
sql) but the mssql server and limit clause. Yes Sql Server never supported the
limit clause (and will probably never will). Of course there is workarounds
for this until the 2005 version came out witch provide as the `ROW_NUMBER()`
function. This can give solution to our problem witch again isn't as elegant
as the limit clause used by MySql for example.

## Hibernate dialect

Unfortunately hibernate does not make use of this function in order to get
paginated data (as we can see [here](http://opensource.atlassian.com/projects/hibernate/browse/HHH-2655)).
Instead uses top to get the first x data and then a scrollable result to only
fetch what the user needs. After downloading the classes and experimenting with
them I ended up with the class bellow witch is a mix of the ones someone can
find at the provided link.

```java
import java.sql.Types;

import org.hibernate.dialect.SQLServerDialect;

/**
 * Modified version based on the work found at {@link http://opensource.atlassian.com/projects/hibernate/browse/HHH-2655}
 *
 */
public class SqlServer2008Dialect extends SQLServerDialect {

 public SqlServer2008Dialect() {
  super();
  registerColumnType(Types.VARCHAR, 1073741823, "NVARCHAR(MAX)");
  registerColumnType(Types.VARCHAR, 2147483647, "VARCHAR(MAX)");
  registerColumnType(Types.VARBINARY, 2147483647, "VARBINARY(MAX)");
 }


 /**
  * Add a LIMIT clause to the given SQL SELECT
  *
  * The LIMIT SQL will look like:
  *
  * WITH query AS (SELECT ROW_NUMBER() OVER (ORDER BY orderby) as __hibernate_row_nr__, original_query_without_orderby)
  * SELECT * FROM query WHERE __hibernate_row_nr__ BEETWIN offset AND offset + last
  * --ORDER BY __hibernate_row_nr__: Don't think that wee need this last order by clause
  *


  * @param querySqlString
  *            The SQL statement to base the limit query off of.
  * @param offset
  *            Offset of the first row to be returned by the query (zero-based)
  * @param limit
  *            Maximum number of rows to be returned by the query
  * @return A new SQL statement with the LIMIT clause applied.
  */
 @Override
 public String getLimitString(String querySqlString, int offset, int limit) {
  if (offset == 0) return super.getLimitString(querySqlString, offset, limit);

  StringBuilder sb = new StringBuilder(querySqlString.trim());

  String querySqlLowered = querySqlString.trim().toLowerCase();
  int orderByIndex = querySqlLowered.toLowerCase().indexOf("order by");
  String orderby = orderByIndex > 0 ? querySqlString.substring(orderByIndex) : "ORDER BY CURRENT_TIMESTAMP";

  // Delete the order by clause at the end of the query
  if (orderByIndex > 0) sb.delete(orderByIndex, orderByIndex + orderby.length());

  // Find the end of the select statement
  int selectIndex = querySqlLowered.trim().startsWith("select distinct") ? 15 : 6;

  // Isert after the select statement the row_number() function:
  sb.insert(selectIndex, " ROW_NUMBER() OVER (" + orderby + ") as __hibernate_row_nr__,");

  //Wrap the query within a with statement:
  sb.insert(0, "WITH query AS (").append(") SELECT * FROM query ");
  sb.append("WHERE __hibernate_row_nr__ ");
  if (offset > 0) sb.append("BETWEEN ").append(offset).append(" AND ").append(limit);
  else sb.append(" <= ").append(limit);

  //I don't think that we really need this last order by clause
  //sb.append(" ORDER BY __hibernate_row_nr__");

  return sb.toString();
 }

 @Override
 public boolean supportsLimit() {
  return true;
 }

 @Override
 public boolean supportsLimitOffset() {
  return true;
 }

 @Override
 public boolean bindLimitParametersFirst() {
  return false;
 }

 @Override
 public boolean useMaxForLimit() {
  return true;
 }
}
```

I've also updated the [jira issue](http://opensource.atlassian.com/projects/hibernate/browse/HHH-2655).
The class has not been heavily tested yet but it seems to work.

Another thing I didn't come up with is how to have the offset and limit
parameters bindable at the query we've created. I hope to find some time
working on that unless you have the solution and would like to drop me a line.
