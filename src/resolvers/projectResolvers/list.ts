import ProjectEntity from '../../entities/ProjectEntity';

export default function list(){

    return ProjectEntity.find();
}