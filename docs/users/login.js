module.exports = {
    post: {
        tags: ["User"], 
        description: "Login", 
        operationId: "loginUser", 
        parameters: [
            {
                name: "user",
                in: "body",
                schema: {
                    $ref: "#/components/schemas/User", // data model of the param
                },
                required: true, // Mandatory param
                description: "User info", // param desc.
            },
        ], 
        responses: {
            200: {
                description: "Login response", 
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Response", 
                        },
                    },
                },
            },
        },
    },
};