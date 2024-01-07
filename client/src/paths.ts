const paths = {
  home () {
    return '/';
  },
  signIn () {
    return '/signin';
  },
  signUp () {
    return '/signup';
  },
  signOut () {
    return '/signout';
  },
  createTicket () {
    return '/tickets/new';
  },
  ticketDetails () {
    return '/tickets/[ticketId]';
  },
  orders () {
    return '/orders';
  }
};

export default paths;