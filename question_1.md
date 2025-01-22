During my internship, I worked on migrating BikeWale's frontend from Razor Pages to React.js. The entire frontend was initially built with Razor Pages, so my responsibility was to migrate these pages to React.js. In total, I migrated more than 10 pages from scratch, reusing existing components as much as possible. Each page had approximately 10-15 components, with some data being fetched on page load and others before the component appeared in the viewport.

### Challenges:
One of the main challenges was reusing existing components without affecting CarWale’s functionality. To overcome this, we made the components more generic, allowing them to render different content based on the application. When components became too complex during the migration, new ones were developed to maintain clean and manageable code.

### Pages Migrated:
Some of the pages I migrated include:
- Model page
- Make page
- Home page
- Images page
- Videos page
- Colors page
- Dealer landing page
- Dealer landing page
- Dealer Showrooms page
- Dealers page
- Scooters page
- Compare bike landing page
- Compare bikes page
- Price in city page

### Approach:
1. **Set up the new web page**: Start by creating the new React.js page.
2. **Identify components**: List the components used in the existing Razor page.
3. **Determine required data**: Identify the data needed to render each component in JavaScript.
4. **Create REST APIs**: Develop APIs to fetch the necessary data for each page.
5. **Map data into DTOs**: Call relevant services and map the data into appropriate DTOs.
6. **Reuse components**: Reuse existing components wherever possible.
7. **Create new components**: Develop new components when necessary, particularly when the existing ones became too complex.
8. **Test the entire flow**: Ensure the entire page flow works as expected.
9. **Write/update unit tests**: Ensure unit tests cover the new and reused components.
10. **Deploy on staging**: Deploy the page to the staging environment and hand it over to the QA team for testing.
11. **Monitor post-release**: After QA approval, release the changes based on A/B testing and monitor results.

### Interesting Aspects Where I Copied Code from Stack Overflow

1. **Debouncing Input in React:**
During the React migration, I needed to debounce the search input. I found a simple `setTimeout` debounce function on Stack Overflow.
**Lesson Learned:** This code helped me realize the importance of managing state and side effects properly in React. I improved the solution by using `useEffect` and `useState` for better performance and cleaner code.

2. **Asynchronous Code in C#:**
I encountered an issue where asynchronous tasks weren’t running in parallel as expected. I found a solution on Stack Overflow that showed me how to use `Task.WhenAll` to execute tasks concurrently.
**Lesson Learned:** This taught me the importance of understanding parallel execution in C#. Afterward, I watched lectures on parallel programming in C# and deepened my knowledge of how `Task.WhenAll` works.

3. **Using AutoMapper for Object Mapping in C#:**
While working on a C# project, I needed to map between complex objects (e.g., mapping a database entity to a DTO). I found a Stack Overflow solution that showed me how to use AutoMapper to simplify the mapping process.
**Lesson Learned:** AutoMapper can significantly reduce the time spent on mapping large objects, but I learned the importance of configuring it properly, especially when dealing with nested objects or custom mapping logic. It’s also crucial to test mappings to ensure they work correctly for all cases and handle large datasets efficiently.