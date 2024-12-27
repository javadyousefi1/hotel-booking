export interface ServerResult<T> {
    data: T[] | T | null,
    message: string | null,
    statusCode: number
}