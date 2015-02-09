---
layout: post
title: "Resolving TCP Error in Octopress Preview"
date: 2014-06-18 15:13:36 -0500
comments: true
categories: 
---
Not all error messages are very helpful. Usually, the less descriptive an error message is, the longer it takes to track down the issue.

In my case, it concerned this blog itself. I was having an error while attempting to preview my site with `rake preview`. The error message:

```
>>> Compass is polling for changes. Press Ctrl-C to Stop.
[2014-06-18 15:09:27] INFO  WEBrick 1.3.1
[2014-06-18 15:09:27] INFO  ruby 1.9.3 (2014-02-24) [i386-mingw32]
[2014-06-18 15:09:27] WARN  TCPServer Error: Permission denied - bind(2)
c:/Ruby193/lib/ruby/1.9.1/webrick/utils.rb:85:in `initialize': Permission denied - bind(2) (Errno::EACCES)
        from c:/Ruby193/lib/ruby/1.9.1/webrick/utils.rb:85:in `new'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/utils.rb:85:in `block in create_listeners'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/utils.rb:82:in `each'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/utils.rb:82:in `create_listeners'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/server.rb:82:in `listen'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/server.rb:70:in `initialize'
        from c:/Ruby193/lib/ruby/1.9.1/webrick/httpserver.rb:45:in `initialize'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/handler/webrick.rb:11:in `new'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/handler/webrick.rb:11:in `run'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/server.rb:264:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/server.rb:141:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/bin/rackup:4:in `<top (required)>'
        from c:/Ruby193/bin/rackup:23:in `load'
        from c:/Ruby193/bin/rackup:23:in `<main>'
```

Upon first glance, one might think I have a permissions issue on port 4000. I ensured nothing was currently running on port 4000 and that the Ruby application had permissions to use ports. Still nothing. Like any millennial, I turned to Google. I searched every combination of `TCP Error`, `Permission denied`, and `WEBrick` I could think of. Found nothing that would fix my problem.

Then I ran across an [issue](https://github.com/imathis/octopress/issues/1395) logged against Octopress with a [comment](https://github.com/imathis/octopress/issues/1395#issuecomment-28758511) that gave me an idea. WEBrick was having issues, so I decided to give 'thin' a chance. Maybe it would give a more descriptive error message or something to help me resolve this issue. It was quick an easy to install 'thin'.

```
$ gem install thin
$ echo gem \"thin\" >> Gemfile
$ bundle install
```

I was cautiously optimistic, but that would only be short lived. Another error message, one that sounded the same at that.

```
Thin web server (v1.6.2 codename Doc Brown)
Maximum connections set to 1024
Listening on 0.0.0.0:4000, CTRL+C to stop
c:/Ruby193/lib/ruby/gems/1.9.1/gems/eventmachine-1.0.3-x86-mingw32/lib/eventmachine.rb:526:in `start_tcp_server': no acceptor (port is in use or requires root privileges) (RuntimeError)
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/eventmachine-1.0.3-x86-mingw32/lib/eventmachine.rb:526:in `start_server'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/thin-1.6.2/lib/thin/backends/tcp_server.rb:16:in `connect'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/thin-1.6.2/lib/thin/backends/base.rb:63:in `block in start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/eventmachine-1.0.3-x86-mingw32/lib/eventmachine.rb:187:in `call'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/eventmachine-1.0.3-x86-mingw32/lib/eventmachine.rb:187:in `run_machine'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/eventmachine-1.0.3-x86-mingw32/lib/eventmachine.rb:187:in `run'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/thin-1.6.2/lib/thin/backends/base.rb:73:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/thin-1.6.2/lib/thin/server.rb:162:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/handler/thin.rb:16:in `run'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/server.rb:264:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/lib/rack/server.rb:141:in `start'
        from c:/Ruby193/lib/ruby/gems/1.9.1/gems/rack-1.5.2/bin/rackup:4:in `<top (required)>'
        from c:/Ruby193/bin/rackup:23:in `load'
        from c:/Ruby193/bin/rackup:23:in `<main>'
```

Naturally, I went to Google yet again. This time searching for words in this error message -- `start_tcp_server`, `no acceptor`, and `eventmachine.rb`.

Still nothing to fix my issue. Maybe WEBrick or thin isn't the issue at all.. 

My next step was to dig into the 'Rakefile' itself to see what exactly is going on inside `rake preview`. I looked at the preview section, but nothing stood out. After several minutes of looking elsewhere in the Rakefile, I found it.

`server_port     = "4000"      # port for preview server eg. localhost:4000`

The only hunch I had about the issue was that something about port 4000 was giving me trouble. Why not try a different port? I updated the line:

`server_port     = "3000"      # port for preview server eg. localhost:3000`

After a `rake generate` and `rake preview` command, I was golden! All was well. Now I no longer have to deploy my site to test if a change is going to work!