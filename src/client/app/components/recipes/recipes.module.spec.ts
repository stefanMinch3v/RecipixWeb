import { RecipesModule } from './recipes.module';

describe('RecipesModule', () => {
  let recipesModule: RecipesModule;

  beforeEach(() => {
    recipesModule = new RecipesModule();
  });

  it('should create an instance', () => {
    expect(recipesModule).toBeTruthy();
  });
});
