import { EditGuesser, ListGuesser, Resource } from "react-admin";
import InventoryIcon from "@mui/icons-material/Inventory";

export const ProductsResource = (
  <Resource
    name="products"
    list={ListGuesser}
    edit={EditGuesser}
    icon={InventoryIcon}
  />
);
