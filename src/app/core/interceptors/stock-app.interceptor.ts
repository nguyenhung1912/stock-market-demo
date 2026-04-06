import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";

export const stockAppInterceptor: HttpInterceptorFn = (req, next) => {
    const userStore = inject(UserStoreService);
    const token = userStore.getToken();

    if (token) {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedReq);
    }

    return next(req);
}