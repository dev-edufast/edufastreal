type Row = Record<string, any>;

type QueryBuilder = {
  values: (data: Row) => QueryBuilder;
  returning: (columns?: string | string[]) => QueryBuilder;
  selectAll: () => QueryBuilder;
  select: (_columns: string | string[]) => QueryBuilder;
  where: (_column: string, _op: string, _value: any) => QueryBuilder;
  orderBy: (_column: string, _direction?: "asc" | "desc") => QueryBuilder;
  limit: (_count: number) => QueryBuilder;
  execute: () => Promise<Row[]>;
  executeTakeFirstOrThrow: () => Promise<Row>;
};

const createQueryBuilder = (): QueryBuilder => {
  let storedValues: Row = {};
  let returnColumns: string[] | undefined;

  return {
    values(data: Row) {
      storedValues = data ?? {};
      return this;
    },
    returning(columns?: string | string[]) {
      if (typeof columns === "string") {
        returnColumns = [columns];
      } else {
        returnColumns = columns;
      }
      return this;
    },
    selectAll() {
      return this;
    },
    select(_columns: string | string[]) {
      return this;
    },
    where(_column: string, _op: string, _value: any) {
      return this;
    },
    orderBy(_column: string, _direction: "asc" | "desc" = "asc") {
      return this;
    },
    limit(_count: number) {
      return this;
    },
    async execute() {
      if (!returnColumns || returnColumns.length === 0) return [storedValues];
      const projection: Row = {};
      for (const col of returnColumns) {
        if (col === "id") {
          projection[col] = typeof storedValues[col] === "number" ? storedValues[col] : 1;
        } else {
          projection[col] = storedValues[col] ?? null;
        }
      }
      return [projection];
    },
    async executeTakeFirstOrThrow() {
      const rows = await this.execute();
      return rows[0] ?? {};
    },
  };
};

type DbLike = {
  insertInto: (table: string) => QueryBuilder;
  selectFrom: (table: string) => QueryBuilder;
  updateTable: (table: string) => QueryBuilder;
  deleteFrom: (table: string) => QueryBuilder;
  [key: string]: any;
};

export const db: DbLike = {
  insertInto(_table: string) {
    return createQueryBuilder();
  },
  selectFrom(_table: string) {
    return createQueryBuilder();
  },
  updateTable(_table: string) {
    return createQueryBuilder();
  },
  deleteFrom(_table: string) {
    return createQueryBuilder();
  },
};

export default db;
