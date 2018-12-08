export class RecipeFormModel {
    constructor(
        public title?: string,
        public ingredients?: string,
        public description?: string,
        public imageUrl?: string,
        public category?: string,
        public cookingTime?: Number,
        public servings?: Number,
    ) { }
}