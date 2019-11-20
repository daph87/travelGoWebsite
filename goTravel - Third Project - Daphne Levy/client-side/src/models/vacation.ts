export class Vacation {
    public constructor(
        public vacationID : number = 0,
        public description :string | undefined = "",
        public destination: string | undefined = "",
        public startDate: string | undefined = "",
        public endDate : string | undefined = "",
        public image : string | undefined = "",
        public price : number = 100
    ) { }
}