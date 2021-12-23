module.exports = {
    components: {
        schemas: {
            Response: {
                type: "object",
                description: "Response of server",
                properties:{
                    success: {
                        type: "boolean", 
                        description: "Is request done successfuly", 
                        example: true,
                    },
                    err: {
                        type: "string",
                        description: "Description of a single error",
                        example: "Login required",
                    },
                    msg: {
                        type: "string",
                        description: "Description of a response",
                        example: "Post created successfuly",
                    },
                }
            },

            User: {
                type: "object", 
                properties: {
                    _id: {
                        type: "string", 
                        description: "Unique ID of user", 
                        example: "61c39cd26e937931cc01c9a2", 
                    },
                    state: {
                        type: "object", 
                        description: "User state", 
                        properties: {
                            is_active: {
                                type: "boolean", 
                                description: "Is user active", 
                                example: true,
                            },
                            created_at: {
                                type: "date", 
                                description: "User registration date", 
                                example: new Date(),
                            },
                            updated_at: {
                                type: "date", 
                                description: "User update date", 
                                example: new Date(),
                            },
                        },
                    },
                    username: {
                        type: "string", 
                        description: "User unique username", 
                        example: "john_", 
                    },
                    is_validated: {
                        type: "boolean", 
                        description: "Is user validated", 
                        example: false,
                    },
                    is_admin: {
                        type: "boolean", 
                        description: "Is user an admin", 
                        example: true,
                    },
                    email: {
                        type: "string", 
                        description: "User email", 
                        example: "john_doe@gmail.com", 
                    },
                    firstname: {
                        type: "string", 
                        description: "User firstname", 
                        example: "John", 
                    },
                    lastname: {
                        type: "string", 
                        description: "User lastname", 
                        example: "Doe", 
                    },
                    mobile: {
                        type: "string", 
                        description: "User mobile phone number", 
                        example: "+981230101121", 
                    },
                },
            },

            Blog: {
                type: "object",
                properties: {
                    _id: {
                        type: "string", 
                        description: "Unique ID of post", 
                        example: "61c39cd26e937931cc01c9a1", 
                    },
                    state: {
                        type: "object", 
                        description: "Post state", 
                        properties: {
                            is_active: {
                                type: "boolean", 
                                description: "Is post active", 
                                example: true,
                            },
                            created_at: {
                                type: "date", 
                                description: "Post create date", 
                                example: new Date(),
                            },
                            updated_at: {
                                type: "date", 
                                description: "Post update date", 
                                example: new Date(),
                            },
                        },
                    },
                    user: {
                        type: "string",
                        description: "Author user ID", 
                        example: "61c39cd26e937931cc01c9a2", 
                    },
                    title: {
                        type: "string",
                        description: "Title of post", 
                        example: "Hello World!", 
                    },
                    content: {
                        type: "string",
                        description: "Content of post", 
                        example: "This is an example of content", 
                    },
                    
                }
            }
        },
    },
}