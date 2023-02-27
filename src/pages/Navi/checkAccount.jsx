import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"
import { Account } from "../../redux/AccountReducer";

export default function CheckAccount() {
    const location = useLocation();
    const navigate = useNavigate();
    const account = useSelector(Account);
    console.log("asdf");
    
}