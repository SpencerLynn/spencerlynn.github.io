---
title: Regex Tip - Don't Capture Groups
date: "2014-06-10T10:54:18"
---
Regular expressions can be super useful, but they can also be a bit of a pain to work with sometimes. Yesterday I learned about something pretty handy -- a way to tell the regular expression to not capture a group. I've been dealing with captured groups that I do not need captured for years now. Finally, I found an way to remove that nuisance.

<!-- more -->

Let's begin by considering the following string with a label and a value separated by a colon. However, white space before and after the colon is optional.

`Some Header: Sample Value`

We want to capture the header text and the value text -- in this example "Some Header" and "Some Value".

So we begin by writing a regular expression

`(.*)(\s*)?:(\s*)?(.*)`

This results in four groups[^1]:

1. `Some Header`
2. `nil`
3. ` `
4. `Some Value`

But really, we don't want to capture the optional white space. It just creates groups we do not want or care about. It may be a nuisance, but it is also a nuisance that we can circumvent. The `?:` option inside of a group tells the regex parser to not capture the group. How convenient! So now let's modify our regex.

`(.*)(?:\s*)?:(?:\s*)?(.*)`

Now we have only the results we care about[^1]:

1. `Some Header`
2. `Some Value`

This is a pretty convenient regex option that I plan on using often going forward.

[^1]: Note: For simplicity I intentionally left out the actual first group in the result -- the full string.