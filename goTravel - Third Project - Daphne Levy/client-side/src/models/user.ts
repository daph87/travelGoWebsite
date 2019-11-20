export class User {
    public constructor(
        public userID : number = 0,
        public firstName :string | undefined = "",
        public lastName: string | undefined = "",
        public username: string | undefined = "",
        public password : string | undefined = "",
    ) { }
}