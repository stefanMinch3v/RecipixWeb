export class RecipeDetailsViewModel{
    constructor(
        public _id?: string,
        public title?: string,
        public ingredients?: string,
        public imageUrl?: string,
        public category?: string,
        public cookingTime?: number,
        public description?: string,
        public dateOfAdded?: Date,
        public raitings?: number,
        public servings?: number,
        public comments?: Array<string>,
        public user?: string
    ) { }
}