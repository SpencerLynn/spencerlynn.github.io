---
layout: post
title: "Using MVC Route Constraints"
date: 2015-03-09 11:09:42 -0600
comments: true
categories:
---
A recent work project needed the ability to "turn on and off" MVC routes dynamically, depending on the user that was logged into the system. However, I didn't want to update all the existing controllers to handle the logic in each action. Furthermore, I didn't want any new controllers/actions to need to know about this logic.

I did some research and tried a few methods. Then [Josh Rogers](http://joshuarogers.net) mentioned `IRouteConstraint`.

<!-- more -->

The `IRouteConstraint` interface only has one method to implement: `Match`. We'll add a class to handle this constraint.

{% highlight csharp linenos=table %}
using System.Linq;
using System.Web;
using System.Web.Routing;

public class UserRouteConstraint : IRouteConstraint
{
    public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
    {
        // We'll return true or false on whether this route is allowed
    }
}
{% endhighlight %}

You'll notice that the arguments into `Match` make this function quite flexible. There is the HTTP context, the parameter name, a route value dictionary that holds various values, and the direction of the route <sup>1</sup> All sorts of route constraints can be built with these combinations. 

For this use case, all we needed to do was check which user was logged in (via a cookie) and see if that user is allowed to visit the area that is being requested. Let's begin to build this method. For now, we will look past how  we determine which views are visible to which user. In my case they were stored in a database. So a quick database query was all that was needed.

{% highlight csharp linenos=table %}
using System.Linq;
using System.Web;
using System.Web.Routing;

public class UserRouteConstraint : IRouteConstraint
{
    public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
    {
        var usernameCookie = httpContext.Request.Cookies["name"];
        if (usernameCookie == null)
            return true;

        return CanUserViewRoute(usernameCookie.Value);
    }

    private bool CanUserViewRoute(string username, Route route, RouteValueDictionary values)
    {
        // 
        var area = (string)route.DataTokens["area"];
        var controller = (string)values["controller"];
        var areaController = string.Format("{0}/{1}", area, controller);
        
        // 
        return GetViewsForUser(usernameCookie.Value).Any(v => v.Equals(areaController));
    }

    private IEnumerable<string> GetViewsForUser(string username)
    {
        // Whatever is needed to determine which views are visible to this user
        return new List<string>();
    }
}
{% endhighlight %}

Obviously, this is far from robust. For example, default actions on controllers are not taken into consideration. It might also be a good idea to find a different way to compare the requested area/controller to the ones visible by the user. Also how those values are stored in the database - "area"/"controller" might be be the best way <sup>2</sup>

Our job is not done yet, however. For this route constraint to work, it has to be added to the route. I already mentioned that I did not want to update each controller. I also don't want to update each Area Registration to include the route constraints. However, I can just spin through all my routes once they are all registered.

In my subclass of `HttpApplication`, in the `Application_Start` method, I will add this constraint to each route. The constraint will be added as a controller constraint.

{% highlight csharp linenos=table %}
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

public class MyApplication : HttpApplication
{
    protected void Application_Start()
    {
        // Other code to register areas

        foreach (Route route in RouteTable.Routes)
        {
            if (route.Constraints == null)
                route.Constraints = new RouteValueDictionary();

            route.Constraints["controller"] = new UserRouteConstraint();
        }

        // Other code to register all routes in each area
    }
}
{% endhighlight %}

Again, this code could probably be spruced up a bit and some robustness added. But for demonstration purposes, it does the job.

For this use case, it worked perfectly. We were able to prevent certain users from accessing routes that were they were not permitted to view.

There might be a better way to do this. If you know of a better way, feel free to comment and let me know!

<sup>1</sup> I'm really good taking a parameter name and re-wording it into a sentence :)
<sup>2</sup> This is just a blog post and demonstration after all. You can't expect me to do all the work for you. That's what StackOverflow is for..