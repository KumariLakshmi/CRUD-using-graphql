const graphql = require('graphql');

const USER = require('../models/user');

const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql

const UserType = new GraphQLObjectType({
    name: "Users",
    description: "USER DETAILS",

    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        emailId: { type: GraphQLString },
        mobile: { type: GraphQLString },
        age: { type: GraphQLString }
    })

})

const RootQuery = new GraphQLObjectType({
    //read
    name: 'RootQueryType',
    description: 'show the user details',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(paresnt, args) {
                return USER.findById(args.id);
            }
        },
        findUser: {
            type: new GraphQLList(UserType),
            resolve() {
                return USER.find({})
            }
        }
    }
})




const Mutation = new GraphQLObjectType({
    //post
    name: 'Mutation',
    description: 'user insert',
    fields: {
        adduser: {
            type: UserType,
            args: {
                userName: { type: GraphQLString },
                emailId: { type: GraphQLString },
                mobile: { type: GraphQLString },
                age: { type: GraphQLString }
            },
            resolve(parent, args) {
                let userList = new USER({
                    userName: args.userName,
                    emailId: args.emailId,
                    mobile: args.mobile,
                    age: args.age
                });
                return userList.save();
            }
        },
        //update
        updateuser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                emailId: { type: GraphQLString },
                mobile: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const userupdated = await USER.findOneAndUpdate
                    ({ _id: args.id }, { emailId: args.emailId, mobile: args.mobile }, { new: true })
                return userupdated
            }
        },
        //delete
        deleteuser:{
            type:UserType,
            args:{
                id: { type: GraphQLID }
            },
            async resolve(parent,args){
                const deleteuser=await USER.findOneAndDelete({
                    _id:args.id
                })
                return deleteuser
            }
        }
    }

})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})