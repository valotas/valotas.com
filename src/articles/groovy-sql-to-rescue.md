---
title: Groovy SQL to the resque
date: 2009-10-24
---

The case is an sql table with about 30 columns that I have to query and export
some (or all) data. In this case plain csv format should be just fine!

## Lazyness

The problem here is that I really don't want to query the database and start
exporting the fields manually from the result set. In this case the possibility
of a plain typo mistake is really high and really hard to find (ok! Im lazy!)

## The solution

A solution to this problem (not lazyness) is to get the table metadata and use
them to get all the fields of the selected rows. Ofcourse you have to build
that or use something ready. Here comes the groovy language...

```groovy
Sql sql = new Sql(ConnectionUtil.getDataSource());
def keyset = null; //A place to keep the column names
sql.eachRow("select * from theTableName") { row ->
  //If the keyset is null create one and add the column names
  if (keyset == null) {
    //We want all the column names exept the one named 'id
    keyset = row.toRowResult().keySet().findAll { it != 'id' }

    //create a nice header for our output
    keyset.each() { print "${it}," }
    print '\n'
  }

  keyset.each() { k ->
    print """row."$k","""
  }
  print '\n'
}
```

This is it! All we've done is to use the groovy's build in
`groovy.sql.GroovyRowResult` (that is `row.toRowResult()`) to get all the
metadata we'll need. Knowing the column names we again use groovy's
`row.columnName` to get the value of the columnName of the row

Now combine that with a groovlet and you will really save time! (did I find
some kind of solution for laziness?)
