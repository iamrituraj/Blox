function parseJsonString(jsonString) {
    try {
        // Parse the JSON string into JavaScript object or array
        const parsed = JSON.parse(jsonString, (_, value) => {
            // Check for large integers and convert them to BigInt
            if (typeof value === "string" && /^\d{15,}$/.test(value)) {
                return BigInt(value); // Convert large integers to BigInt
            }

            // Check for floating-point numbers (arbitrary precision isn't possible without external library)
            if (typeof value === "string" && /^[0-9]*\.[0-9]+$/.test(value)) {
                return parseFloat(value); // Use JavaScript's native `parseFloat` for float conversion
            }

            return value; // Return other values as they are
        });

        // If parsed object is an array, return it as a List (JavaScript Array)
        if (Array.isArray(parsed)) {
            return parsed; // List
        }

        // If parsed object is a regular object (not an array), convert it to a Map
        if (typeof parsed === "object" && parsed !== null) {
            return new Map(Object.entries(parsed)); // Convert object to Map
        }

        return parsed; // Return the parsed value directly if it's neither an array nor an object
    } catch (error) {
        throw new Error(`Invalid JSON string: ${error.message}`);
    }
}

// Example usage
const jsonInput_1 = `
{
    "largeInt": "123456789012345678901234567890",
    "preciseFloat": "123.456789123456789123456789",
    "regularInt": 42,
    "regularFloat": 3.14,
    "nested": {
        "anotherLargeInt": "98765432109876543210987654321"
    },
    "list": [1, 2, 3, 4]
}
`;

const jsonInput_2 = `
[{
    "largeInt": "123456789012345678901234567890",
    "preciseFloat": "123.456789123456789123456789",
    "regularInt": 42,
    "regularFloat": 3.14,
    "nested": {
        "anotherLargeInt": "98765432109876543210987654321"
    },
    "list": [1, 2, 3, 4]
}]
`;

try {
    console.log("Processing input 1");
    const parsed_1 = parseJsonString(jsonInput_1);
    console.log(parsed_1);

    console.log("Processing input 2");
    const parsed_2 = parseJsonString(jsonInput_2);

    console.log(parsed_2); 
} catch (err) {
    console.error(err.message);
}
