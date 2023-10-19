def methodBody(object_id, method_name):
    return "\tWywołano metodę \033[4minstancyjną\033[0m \033[7m{method_name:^16}\033[0m obiektu \033[{color}m{object_id}\033[0m".format(
        method_name=method_name + "()",
        color="48;5;{}".format(object_id % 255),
        object_id=object_id,
    )
