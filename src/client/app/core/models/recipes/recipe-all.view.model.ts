export class RecipeAllViewModel {
    constructor(
        public _id?: string,
        public title?: string,
        public ingredients?: string,
        public imageUrl?: string,
        public category?: string,
        public cookingTime?: number
    ) { }
}