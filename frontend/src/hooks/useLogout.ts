import { apiLogOutUser } from "@/services/auth"
import useUserStore from "@/store/userStore"
import { useMutation } from "@tanstack/react-query"

const useLogout = () => {

    const { clearUser } = useUserStore()

    const { mutate } = useMutation({
        mutationFn: apiLogOutUser
    })

    const handleLogout = async () => {
        await mutate()
        clearUser()
    }

    return { handleLogout };
}

export default useLogout