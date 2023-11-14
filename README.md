# TWILine 

## What is this?

This page hopes to be a newbie-friendly guide for people who are still in the middle of reading The Wandering Inn and are wondering when particular characters or plot threads will pick back up.

Wondering when Ryoka will show up again? Or maybe you're wondering when she'll go away? Hopefully, this has the answers you're looking for. My hope is that this visual guide will tell you how long you can defer reading a chapter.

## Why even?

A common--and valid--criticism of TWI is that sometimes, you'll be reading about something that grips you, when suddenly the next chapter jumps to a POV that's totally unrelated, and goes on for quite a while with no clear link to the original story. This can be very jarring when you're really vibing with someone then get forced into another character's POV, and you get impatient about when it's going to go back to the cool person.

My hope is that a visual guide like this will help you curate your own experience when reading. Don't like the character whose side story interrupted Erin's crucial chess game? Find the continuation of the chess game at a glance, and see when the other character's story becomes relevant to Erin's! Then once you've had your fill of Erin, decide whether to go back to that character's POV, or skip it entirely!

# For contributors

## What is this NOT?

Good question. This is NOT the TWI wiki. That is, it is NOT an obsessive chronicling of every single detail about the story. I do not think, for instance, we will ever see or mention Errif Jealwind on this timeline, unless he somehow does something extremely amazing in a chapter that gets published after I write this.

The double-bordered nodes are NOT summaries of those chapters, they are quick catch-up tips containing things that people new to the series might need to know if they skipped one of the threads leading up to it! Think "previously on" segments on an episode of TV.

## I'm a reader, how can I help?

Contribute to the timeline! That would be this file: https://github.com/cmarguel/twiline/blob/master/timeline.yml

The format for an entry in the timeline is as follows (this may change in the future as more features are added) and whether you contribute via git or via chat, I need all contributions to be in this format. *This is a case-sensitive list*, which means that the capitalization of letters should be carefully considered:

```
                -
                    title: "Interlude - Shrek's Revenge"
                    url: "http://wanderinginn.com/some/fake/url/to/the/chapter"
                    prereqs: ["25.33 R", "55.6 S"]
                    rank: 1
                    povs: [erin, shrek]
                    guests: [ryoka]
                    from: Interlude - The Great Ritual
                    type: jump
                    catchup: >
                        Shrek rampaged through Celum, heading south, and now sees Liscor in the 
                        distance. Meanwhile, Erin is done with her party plans and is about to 
                        commence the festivities.
```        

The attributes are as follows:

- *title* - The title, as seen in the table of contents. This must be unique. If you find any titles that are identical, feel free to add something to distinguish it.
- *url* - The url linking to the chapter. I have already populated the timeline with all the titles and URLs, so you won't actually need to touch these as long as I know where your contribution is supposed to go
- *prereqs* - A list of titles of chapters whose stories lead directly into this one. Make sure to follow the format in the sample!
- *rank* - a number from 1 to 5, rating how far from Erin (storywise) the chapter is. In practice, this just determines which of the five columns to place a chapter in. From left to right, the ranks of the columns are as follows: 4 2 1 3 5. In other words, A rank 1 story is placed in the center of the timeline, and rank 5 goes off to the right side.
povs - a lowercase list of one word names of characters whose POVs feature in the chapter. Please try to use names that have been used before! If I've used `klbkch` in the past, don't call him `klb`!
- *guests* - same, but for relevant characters who aren't necessarily the POVs of the chapter. This is highly subjective, mind you! I'm still ironing out my philosophy for what goes here, but my current thinking is that you should only include characters who have their own threads soon or have had them recently. Sure, Tkrn may get a POV in a much later volume, but does he really need to be noted down at all anywhere in v1? In any case, don't spend too much time thinking about this--priority should be on prereqs, rank, and povs.
- *from* - some prerequisite chapters are so far away in the past that it would be ugly or unreasonable to have an arrow extending all the way from there. The timeline has accomodations for one "portal" type node that uses dashed lines, placed directly above the chapter node. I haven't figured out what to do yet for the cases where multiple plot threads from very far back in the past are converging, but those are probably best handled by the previouslyOn attribute described below.
- *type* - similar to above, some nodes either have a next part that's extremely far in the future, or branch into so many arcs, that it would make the timeline look ugly. use type: jump to display an empty "portal" type node to designate such a chapter. There are currently no other types, but there may be in the future should we think of anything important.
- *previouslyOn* - The > sign at the start, by itself, is important! Don't forget it! This attribute is NOT a summary of the chapter and it is NOT required. Think of "Previously On" like what you see in serialized TV shows. Generally, we only want these on nodes that have more than one arrow pointing into them, so if a node, say, has arrows from a Ryoka-centric chapter and an Erin-centric chapter pointing into them, write a sentence telling us what relevant activities each of them have done in the preceding chapters. For instance: "Erin has been busy baking a weird cake. Ryoka has just left Tattooine with the gift she received from Jar Jar Binks."


## I'm a coder, how can I help?

Mainly? Frontend stuff. Offhand:

- Loading takes hilariously long, and a large part of that is because the timeline is being generated dynamically by frontend javascript. I made that decision so that 1. I can just throw it on Github Pages and not worry about paying for server time somewhere, and 2. so that anyone can fork it and make their own timeline if they vehemently disagree with mine.
- I barely put any thought to how this would look on different browsers and devices, and I'm hoping someone better than me at this stuff can help.
- Related to this, the character art decorating the timeline doesn't scale properly--the characters' relative sizes get wonky on mobile.
- Similarly, the design is not responsive at all--look at how the background images behave (or rather, don't behave) when resizing the window.
- The info panels you get on hover can cause the screen to have horizontal scroll; preferably they should stay within the width of the page
- The same info panels can block you from interacting with the chapters they're associated with.
- Ideally, the little floating characters scattered around the timeline should have a parallax scrolling effect, but figuring that out was too much of a pain. If someone can figure out how, please send help!
