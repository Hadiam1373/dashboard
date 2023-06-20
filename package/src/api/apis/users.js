import axiosIns from "@/api/fetch/interceptors";

class Users {
    async getProfile() {
        return await axiosIns.get('panel')
    }

    async getUsersData(page, name, email) {
        return await axiosIns.get('panel/users', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(email ? {email: email} : {}),
            }
        })
    }

    async getEditedData(id) {
        return await axiosIns.get(`panel/users/${id}/edit`)
    }

    async createUser(formData) {
        return await axiosIns.post('panel/users', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    async updateUser(formData, id) {
        return await axiosIns.post(`panel/users/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    async getEditedPassword(id) {
        return await axiosIns.get(`panel/users/reset/password/${id}`)
    }

    async updatePassword(formData, id) {
        return await axiosIns.post(`panel/users/reset/password/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    async getEditedRoles(id) {
        return await axiosIns.get(`panel/roles-assignment/${id}/edit`, {
            params: {
                model: 'users'
            }
        })
    }

    async updateRoles(id, roles, permissions) {
        return await axiosIns.patch(`panel/roles-assignment/${id}`
            , {
                "roles": roles,
                "permissions": permissions
            }

            , {
                params: {
                    model: 'users'
                }
            })
    }

    async getRoles(page, name, display_name) {
        return await axiosIns.get('panel/roles', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(display_name ? {display_name: display_name} : {}),
            }
        })
    }

    async removeRoles(id) {
        return await axiosIns.delete(`panel/roles/${id}`)
    }

    async EditedRoles(id) {
        return await axiosIns.get(`panel/roles/${id}/edit`)
    }

    async roleCreateOption() {
        return await axiosIns.get(`panel/roles/create`)
    }

    async creteRole(name, label, description, permissions) {
        return await axiosIns.post('panel/roles', {
            display_name: name,
            name: label,
            description: description,
            permissions: permissions
        })
    }

    async getPermissions(page, name, display_name) {
        return await axiosIns.get('panel/permissions', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(display_name ? {display_name: display_name} : {}),
            }
        })
    }

    async updatePermissions(id, name, label, des) {
        return await axiosIns.patch(`panel/permissions/${id}`
            , {
                "name": name,
                "display_name": label,
                "description": des
            }
        )
    }



    async removePermissions(id) {
        return await axiosIns.delete(`panel/permissions/${id}`)
    }

    async EditedPermissions(id) {
        return await axiosIns.get(`panel/permissions/${id}/edit`)
    }


    async cretePermissions(name, label, description) {
        return await axiosIns.post('panel/permissions', {
            display_name: label,
            name: name,
            description: description,
        })
    }
}

export default new Users()
