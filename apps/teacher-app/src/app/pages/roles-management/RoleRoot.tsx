import RoleManagement from "./RoleManagement"
import { RoleManagementContextProvider } from "./RoleManagementContext"

const RoleRoot = () => {
  return (
   <RoleManagementContextProvider>
    <RoleManagement />
   </RoleManagementContextProvider>
  )
}

export default RoleRoot
