export interface PaginationParams {
    page?: number; // Current page number (default: 1)
    perPage?: number; // Items per page (default: 10)
}

export interface PaginationResult<T> {
    data: T[]; // The list of items
    total: number; // Total number of items in the database
    page: number; // Current page
    perPage: number; // Items per page
    totalPages: number; // Total pages
}
export const paginate = async <T>(
    model: any, // Prisma model (e.g., prisma.user)
    params: PaginationParams,
    where: object = {}, // Optional filters
    select: object = {} // Optional field selection
): Promise<PaginationResult<T>> => {
    // Validate and set default values for `page` and `perPage`
    const page = Math.max(Number(params.page) || 1, 1); // Default to 1, ensure it's at least 1
    const perPage = Math.max(Number(params.perPage) || 10, 1); // Default to 10, ensure it's at least 1
    // Calculate offset
    const skip = (page - 1) * perPage;
    // Fetch data with pagination
    const [data, total] = await Promise.all([
        model.findMany({
            // where,
            // select,
            skip,
            take: perPage,
        }),
        model.count({ where }), // Count total items
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(total / perPage);

    return {
        total,
        page,
        perPage,
        totalPages,
        data,
    };
};
