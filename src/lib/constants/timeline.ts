export interface TimelineItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2018",
    titleKey: "timeline.2018.title",
    descriptionKey: "timeline.2018.description",
  },
  {
    year: "2019",
    titleKey: "timeline.2019.title",
    descriptionKey: "timeline.2019.description",
  },
  {
    year: "2020",
    titleKey: "timeline.2020.title",
    descriptionKey: "timeline.2020.description",
  },
  {
    year: "2022",
    titleKey: "timeline.2022.title",
    descriptionKey: "timeline.2022.description",
  },
  {
    year: "2024",
    titleKey: "timeline.2024.title",
    descriptionKey: "timeline.2024.description",
  },
] as const;
