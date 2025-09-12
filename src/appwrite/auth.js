import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
	client = new Client();
	account;

	constructor() {
		console.log("())()", conf.appwriteUrl)
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create({ params: { userId: ID.unique(), email, password, name } });
			if (userAccount) return this.login({ email, password });
			return userAccount;
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession({ params: { email, password } });
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log('No current user');
		}
		return null;
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
};

const authService = new AuthService();

export default authService;