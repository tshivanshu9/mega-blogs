import { Client, ID, TablesDB, Storage, Query } from 'appwrite';
import conf from '../conf/conf.js';

export class Service {
  client = new Client();
  account;
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          status,
          content,
          featuredImage,
          userId,
        },
      });
    } catch (error) {
      console.log({
        message: 'Error creating post',
        error: JSON.stringify(error),
      });
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          status,
          content,
          featuredImage,
        },
      });
    } catch (error) {
      console.log({
        message: 'Error updating post',
        error: JSON.stringify(error),
      });
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log({
        message: 'Error deleting post',
        error: JSON.stringify(error),
      });
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log({
        message: 'Error getting post',
        error: JSON.stringify(error),
      });
      return false;
    }
  }

  async getPosts(
    queries = [Query.equal('status', 'active'), Query.orderDesc('$createdAt')]
  ) {
    try {
      return await this.database.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries,
      });
    } catch (error) {
      console.log({
        message: 'Error getting posts',
        error: JSON.stringify(error),
      });
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log({
        message: 'Error uploading file',
        error: JSON.stringify(error),
      });
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log({
        message: 'Error deleting file',
        error: JSON.stringify(error),
      });
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
