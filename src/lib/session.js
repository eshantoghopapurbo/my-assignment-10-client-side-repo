export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user) {
        redirect('auth/signin');
    }
    if (user.role !== role) {
        redirect('/unauthorized');
    }
    return user;
}