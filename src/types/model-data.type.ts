export interface ModelData {
    name: string;
    status: number;
    parentId?: string;
    isPlane: boolean;
    notes?: string;
    _id: string;
    meta: {
        restaurantID: string;
    };
    _idOrganization: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    modelPath: {
        mdpi?: string;
        glb: string;
        usdz?: string;
        _id: string;
    };
}
