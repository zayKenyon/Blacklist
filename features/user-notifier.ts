import userSchema from "../schemas/user-schema";

export default async (target: string) => {
    const result = await userSchema.findOne({user: target})
    console.log(target)
    console.log('Result:', result)
}

export const config = {
    dbName: 'USER_NOTIFIER',
    displayName: 'User Notifier',
}
