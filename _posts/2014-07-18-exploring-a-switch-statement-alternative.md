---
layout: post
title: "Exploring a Switch Statement Alternative"
date: 2014-07-18 12:54:42 -0500
comments: true
categories:
---
I ran across this [article](http://www.codeproject.com/Tips/798140/Switch-statement-alternative) on an alternative to switch statements. Basically it was using a look-up table rather than a switch statement.

<!-- more -->

The first example used the following:

{% highlight csharp linenos=table %}
var myNum = 12;

var cases = new Dictionary<Func<int, bool>, Action>
{
    { x => x < 3 ,    () => Console.WriteLine("Smaller than 3")   },
    { x => x < 30 ,   () => Console.WriteLine("Smaller than 30")  },
    { x => x < 300 ,  () => Console.WriteLine("Smaller than 300") }
};

cases.First(kvp => kvp.Key(myNum)).Value();
{% endhighlight %}

After reading I discussed with [Josh Rogers](http://joshuarogers.net). We were impressed with the power to be able to define any condition you'd like as the 'key' to the lookup table. Josh pointed out the ability to add or remove 'cases' on the fly as needed. The value for the first true condition is the one returned (Oh, like a switch statement), but you can add/remove these cases on the fly (Cool, like a dictionary?). So it's as if a switch statement and a dictionary produced a child.

Switch statements have default cases, though. What about those? Default cases become a bit tricky. The default case would have to be the last entry in the dictionary to ensure that it is executed last. So if you added or removed cases, you would have to ensure that the default case was still last. However, a dictionary isn't ordered -- some say it's kind of the point.

Moving on, what would this default case even look like? Maybe this?

{% highlight csharp %}
x => true, () => Console.WriteLine("Default case.")
{% endhighlight %}

So how would this be used in real life, anyway? It seems like some special thought and handling has to be put into each time this concept is implemented. How practical is it to have all that handling each time? It seems like a lot of code that will look the same each time you want to use one of these.

Why not extract this whole idea into a class to make it easier to use? Let's call it `Swictionary`<sup>1</sup>, since this is supposed to be the offspring of a switch and a dictionary. Since we are extracting this into a class, we can pull the default case outside of the cases themselves. This will be more clear anyway, and we won't have to worry about in what order the default case is added. We can also expose methods to add cases and update the default case.

Take 1 of the `Swictionary` class:

{% highlight csharp linenos=table %}
using System;
using System.Collections.Generic;
using System.Linq;

public class Swictionary<T>
{
	private Dictionary<T, Action> Cases;
	private Action Default;

	public Swictionary(Dictionary<T, Action> cases, Action @default)
	{
		this.Cases = cases;
		this.Default = @default;
	}

	public Action GetValue(T key)
	{
		Action value;
		if (Cases.TryGetValue(key, out value))
			return value;

		return Default;
	}

	public void AddCase(T key, Action @case)
	{
		Cases[key] = @case;
	}

	public void UpdateDefault(Action @default)
	{
		this.Default = @default;
	}
}
{% endhighlight %}

This seemed to work for simple types, such as `int`, `string`, etc. But the example in the [article](http://www.codeproject.com/Tips/798140/Switch-statement-alternative) used `Func<int, bool>` types. This is, after all, where all the power would be. And while we're at it, why limit the user to just `Action` types as the value?

I knew this could be better. So I showed this to [Joey Robichaud](https://github.com/JoeRobich) and some collaboration happened.

Take 2 of `Swictionary` class:

{% highlight csharp linenos=table %}
using System;
using System.Collections.Generic;
using System.Linq;

public class Swictionary<TKey, TValue>
{
    readonly Dictionary<Predicate<TKey>, TValue> Cases;
    TValue Default;

    public Swictionary(TValue @default)
    {
        Default = @default;
        this.Cases = new Dictionary<Predicate<TKey>, TValue>();
    }

    public Swictionary(Dictionary<TKey, TValue> cases, TValue @default)
        : this(@default)
    {
        cases.ToList().ForEach(kvp => AddCase(kvp.Key, kvp.Value));
    }

    public Swictionary(Dictionary<Predicate<TKey>, TValue> cases, TValue @default)
        : this(@default)
    {
        cases.ToList().ForEach(kvp => AddCase(kvp.Key, kvp.Value));
    }

    public TValue GetValue(TKey @case)
    {
        var caseValue = Cases.FirstOrDefault(kvp => kvp.Key(@case));
        if (!caseValue.Equals(default(KeyValuePair<Predicate<TKey>, TValue>)))
            return caseValue.Value;

        return this.Default;
    }

    public void AddCase(TKey @case, TValue value)
    {
        AddCase(t => t.Equals(@case), value);
    }

    public void AddCase(Predicate<TKey> @case, TValue value)
    {
        Cases[@case] = value;
    }

    public void UpdateDefault(TValue @default)
    {
        this.Default = @default;
    }
}
{% endhighlight %}

Explore for yourself in this [dotnetFiddle](https://dotnetfiddle.net/qeApD5) or with this GitHub [gist](https://gist.github.com/SpencerLynn/634d1dbafdfd0f1acd53).

We generalized both the input and output of the 'switch' statement. This allows the user to do whatever pleases them, in our `SwitchTestDriver` example (found in the gist and jsFiddle), we used `int` as the input and `Action` as the output.

This gives a lot of flexibility to invent new ways to use conditional look ups.

<sup>1</sup> I wish I could say I came up with the name `Swictionary`, but all that credit belongs to [Joey Robichaud](https://github.com/JoeRobich).