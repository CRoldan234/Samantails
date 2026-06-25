declare module 'sql.js' {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  interface QueryExecResult {
    columns: string[];
    values: any[][];
  }

  interface Statement {
    bind(params?: any[]): boolean;
    step(): boolean;
    getAsObject(): Record<string, any>;
    free(): boolean;
    run(params?: any[]): void;
  }

  interface Database {
    run(sql: string, params?: any[]): void;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export default function initSqlJs(config?: any): Promise<SqlJsStatic>;
  export { Database as Database, SqlJsStatic as SqlJsStatic };
}
