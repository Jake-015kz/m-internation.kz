export interface BusinessStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  featured: boolean;
}

export const BUSINESS_STEPS: BusinessStep[] = [
  {
    id: "register",
    titleKey: "steps.register.title",
    descriptionKey: "steps.register.description",
    featured: true,
  },
  {
    id: "training",
    titleKey: "steps.training.title",
    descriptionKey: "steps.training.description",
    featured: false,
  },
  {
    id: "income",
    titleKey: "steps.income.title",
    descriptionKey: "steps.income.description",
    featured: false,
  },
] as const;
