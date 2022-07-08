import {combineReducers} from "redux";
import { authReducer } from "../../components/auth/login/reducer";
export const rootReducer = combineReducers({
    auth: authReducer
});
export type RootState = ReturnType<typeof rootReducer>;