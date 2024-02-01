import {useRouter} from "next/router";
import {useEffect} from "react";

export default function useBeforeUnload(isDirty) {
    const router = useRouter();
    useEffect(() => {
        const onBeforeUnload = () => {
            if (isDirty) {
                if (window.confirm('You have unsaved changes, are you sure you want to leave?')) {
                    router.events.emit('routeChangeComplete');
                } else {
                    router.events.emit('routeChangeError');
                }
            }
        };

        const beforeunloadHandler = (e) => {
            e.preventDefault()
            e.returnValue = true
        }

        const handleRouteChangeError = () => {
            // tslint:disable-next-line: no-string-throw
            throw 'Route has been aborted, ignore this message'
        };

        router.events.on('beforeHistoryChange', onBeforeUnload)
        router.events.on('routeChangeError', handleRouteChangeError)

        if (isDirty === true) {
            window.addEventListener("beforeunload", beforeunloadHandler)
        }

        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler)
            router.events.off('beforeHistoryChange', onBeforeUnload)
            router.events.off('routeChangeError', handleRouteChangeError)
        };
    }, [isDirty]);
}
