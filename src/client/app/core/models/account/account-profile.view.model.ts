export class AccountProfileViewModel {
    constructor(
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public recipes?: string[any],
        public ratings?: string[any],
        public comments?: string[any]
    ) { }
}