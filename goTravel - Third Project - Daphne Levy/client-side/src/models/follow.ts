export class Follow {
    public constructor(
        public userID : number =1,
        public vacationID : number = 1,
        public description :string | undefined = "",
        public destination: string | undefined = "",
        public startDate: string | undefined = "",
        public endDate : string | undefined = "",
        public image : string | undefined = "",
        public price : number = 0
      
    ) { }
}