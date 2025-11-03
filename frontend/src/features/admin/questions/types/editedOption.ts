import {QuestionEditorFragmentFragment} from "@/gql/graphql.ts";

export enum EditState {
    Edited = "edited",
    Deleted = "deleted",
    Created = "created",
}

type ExistingOption = QuestionEditorFragmentFragment["options"][number] & {
    // Undefined if not touched
    editState?: EditState.Edited | EditState.Deleted;
}
type NewOption = Omit<ExistingOption, "id" | "editState"> & {
    editState: EditState.Created;
    key: string;
}
export type EditedOption = ExistingOption | NewOption;