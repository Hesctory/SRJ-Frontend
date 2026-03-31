import { Login } from "react-admin"
import CustomLoginForm from '../components/CustomLoginForm';

const loginStyles = {
  backgroundColor: '#f7f9fc', // fondo claro suave (gris-azulado)
};

const imageURL: string = "https://scontent.fqsc1-1.fna.fbcdn.net/v/t39.30808-6/656435870_122290675292224984_6190554628380082286_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFA2bczE7MwuDesf1nLJsz4Lx8LAiB1USQvHwsCIHVRJPRRljV2R6T3BaWt3q_1GSM-6VJ6kl66P52t18DYPwLh&_nc_ohc=KwCV7yCnD2YQ7kNvwFmXMYO&_nc_oc=AdrZg_eW3iwEyaaejcJk2setArFRUcBT0_psCCzEtTjKcg4vzQXaAc-VnieePT0Ub4n-1pu2NA9eszTROEEMqSEa&_nc_zt=23&_nc_ht=scontent.fqsc1-1.fna&_nc_gid=bgPgQUzXTcfwp7QySw8lxA&_nc_ss=7a32e&oh=00_AfwfE1agOGtAtJcsMOKD1WIKXPvdlW7Q4IuUTrPRrDHVmg&oe=69CD9DDF";

const CustomLogin = () => {
    return (
        <Login 
            sx = {loginStyles} 
            title="Bienvenido a SRJ System"
        >
            <CustomLoginForm />
        </Login>
    )
}

export default CustomLogin;