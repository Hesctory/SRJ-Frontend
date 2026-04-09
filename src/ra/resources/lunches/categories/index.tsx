import { Resource } from "react-admin";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { CategoriesList } from "./CategoriesList";
import { CategoriesCreate } from "./CategoriesCreate";
import { CategoriesEdit } from "./CategoriesEdit";

export const LunchCategoriesResource = (
    <Resource
        name="categories"
        list={CategoriesList}
        create={CategoriesCreate}
        edit={CategoriesEdit}
        icon={RestaurantIcon}
    />
);
