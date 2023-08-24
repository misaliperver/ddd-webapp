export type RepositoryFindOptionsPayload = {
    includeRemoved?: boolean
    limit?: number;
    offset?: number;
  };
  
export type RepositoryUpdateManyOptionsPayload = {
    includeRemoved?: boolean
};

export type RepositoryRemoveOptionsPayload = {
    disableSoftDeleting? : boolean
};
  