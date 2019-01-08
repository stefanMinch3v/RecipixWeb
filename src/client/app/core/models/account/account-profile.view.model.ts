export class AccountProfileViewModel {
    constructor(
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public roles?: [string]
    ) { }
}