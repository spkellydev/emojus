# EmojUs

Full stack javascript application written with React JS, Node, Express and persisted data with MongoDB. This application "shortens" urls by creating an emojified version of the URL. _Note:_ the URL will be a minimum of 22 characters, making it (probably) the lengthiest URL shortener out there.

# Uniqueness

All URLs are generated using a custom _emoji_ charset which has been base62 encoded to ensure the most unique URLs possible. How many URL cominations does that make? The charset includes 62 emojis and each link will have 6 emojis appended to the, making the number of possible combinations: 6,147,4519.

There has been no collision checking, as it was not part of the project's scope and would add unneccesary overhead. In lieu of collision checking, 6 emojis were selected so that the likelihood of collisions would be fewer while also providing the abilitiy to bijectively create random IDs.

This means that 6 emojis will produce an array of IDs, those IDs will then be base62 encoded to create an ID specific to the link provided. That link ID can then be reduced back down to an array of IDs which can be mapped into a string of emojis.

As a secondary precaution, because of the lack of collision checking, all links have been given a 7 day expiration date.
