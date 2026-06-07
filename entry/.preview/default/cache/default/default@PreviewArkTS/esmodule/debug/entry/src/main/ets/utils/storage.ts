import preferences from "@ohos:data.preferences";
// 本地缓存封装 - 基于Preferences，支持token/用户信息/设置持久化
class StorageUtil {
    private storeName: string = 'wallpaper_prefs';
    private prefs: preferences.Preferences | null = null;
    async init(context: Context): Promise<void> {
        try {
            this.prefs = await preferences.getPreferences(context, this.storeName);
        }
        catch (err) {
            console.error('Preferences初始化失败:', JSON.stringify(err));
        }
    }
    async set(key: string, value: string): Promise<void> {
        try {
            await this.prefs?.put(key, value);
            await this.prefs?.flush();
        }
        catch (err) {
            console.error('存储失败:', JSON.stringify(err));
        }
    }
    async get(key: string): Promise<string> {
        try {
            return await this.prefs?.get(key, '') as string ?? '';
        }
        catch (err) {
            console.error('读取失败:', JSON.stringify(err));
            return '';
        }
    }
    async remove(key: string): Promise<void> {
        try {
            await this.prefs?.delete(key);
            await this.prefs?.flush();
        }
        catch (err) {
            console.error('删除失败:', JSON.stringify(err));
        }
    }
    async clear(): Promise<void> {
        try {
            await this.prefs?.clear();
            await this.prefs?.flush();
        }
        catch (err) {
            console.error('清空失败:', JSON.stringify(err));
        }
    }
    async has(key: string): Promise<boolean> {
        try {
            return await this.prefs?.has(key) ?? false;
        }
        catch (err) {
            console.error('检查键值失败:', JSON.stringify(err));
            return false;
        }
    }
}
const storage = new StorageUtil();
export default storage;
