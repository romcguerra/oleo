import Users from '../models/Users';

export default{
    render(usre: Users){
        return{
            name: usre.name,
            telefone: usre.telefone,
            senha: usre.senha,
            email: usre.email,
            latitude: usre.latitude,
            longitude: usre.longitude,
        };
    },
    renderMany(users: Users[]){
        return users.map(user => this.render(user))
    }
};