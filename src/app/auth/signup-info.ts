export class SignUpInfo {
    nom: string;
    prenom: string;
    telephone: string;
    age: string;
    login: string;
    password: string;

    constructor(nom: string, prenom: string,telephone:string,age:string, login: string, password: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.age = age;
        this.login = login;
        this.password = password;
    }
}
