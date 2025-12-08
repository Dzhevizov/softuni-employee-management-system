import { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import UserItem from "./UserItem";
import UserDeleteModal from "./UserDeleteModal";
import UserSaveModal from "./UserSaveModal";

export default function UserList({
    users,
    onSortUsers,
    forceRefresh,
}) {
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showUserDelete, setShowUserDelete] = useState(false);
    const [showUserEdit, setShowUserEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [sortDirection, setSortDirection] = useState(false);

    const detailsActionClickHandler = (userId) => {
        setShowUserDetails(true);
        setSelectedUserId(userId);
    };

    const deleteActionClickHandler = (userId) => {
        setShowUserDelete(true);
        setSelectedUserId(userId);
    };

    const editActionClickHandler = (userId) => {
        setShowUserEdit(true);
        setSelectedUserId(userId);
    };

    const closeModalHandler = () => {
        setShowUserDetails(false);
        setShowUserDelete(false);
        setShowUserEdit(false);
        setSelectedUserId(null);
        forceRefresh();
    };

    const editUserHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const {country, city, street, streetNumber, ...userData} = Object.fromEntries(formData);
        userData.address = {
            country,
            city,
            street,
            streetNumber
        };

        userData.updatedAt = new Date().toISOString();

        try {
            await fetch(`http://localhost:3030/jsonstore/users/${selectedUserId}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            closeModalHandler();
        } catch (err) {
            alert(err.message);
        }
    };

    const sortUsersHandler = () => {
        setSortDirection(state => !state);
        onSortUsers(sortDirection);
    }

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>
                    Image
                    </th>
                    <th>
                    First name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                        </path>
                    </svg>
                    </th>
                    <th>
                    Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                        </path>
                    </svg>
                    </th>
                    <th>
                    Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                        </path>
                    </svg>
                    </th>
                    <th>
                    Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor"
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                        </path>
                    </svg>
                    </th>
                    <th onClick={sortUsersHandler}>
                    Created
                    <svg 
                        aria-hidden="true"
                        focusable="false"
                        className="icon active-icon Table_icon__+HHgn"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        >
                        {sortDirection ? (
                            // стрелка нагоре
                            <path
                            fill="currentColor"
                            d="M169.4 41.4l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 101.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V101.3l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0z"
                            />
                        ) : (
                            // стрелка надолу
                            <path
                            fill="currentColor"
                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.4-3.1-22.6-9.4l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 370.8V64c0-17.7 14.3-32 32-32s32 14.3 32 32v306.8l105.4-105.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"
                            />
                        )}
                    </svg>
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <UserItem 
                            {...user} 
                            key={user._id} 
                            onDetailsClick={detailsActionClickHandler}
                            onDeleteClick={deleteActionClickHandler}
                            onEditClick={editActionClickHandler}
                        />
                    )}                                 
                </tbody>
            </table>

            {showUserDetails && 
                <UserDetailsModal 
                    userId={selectedUserId}
                    onClose={closeModalHandler} 
                />
            }

            {showUserDelete &&
                <UserDeleteModal 
                    userId={selectedUserId}
                    onClose={closeModalHandler}
                />
            }

            {showUserEdit &&
                <UserSaveModal
                    isEditMode 
                    userId={selectedUserId}
                    onClose={closeModalHandler}
                    onSubmit={editUserHandler}
                />
            }
            
        </div>
    );
}