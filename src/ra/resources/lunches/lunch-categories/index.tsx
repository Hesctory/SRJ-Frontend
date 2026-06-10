import { Resource } from "react-admin";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { LunchCategoriesList } from "./LunchCategoriesList";
import { LunchCategoriesCreate } from "./LunchCategoriesCreate";
import { LunchCategoriesEdit } from "./LunchCategoriesEdit";

export const LunchCategoriesResource = (
  <Resource
    name="lunch-categories"
    list={LunchCategoriesList}
    create={LunchCategoriesCreate}
    edit={LunchCategoriesEdit}
    icon={RestaurantIcon}
  />
);
